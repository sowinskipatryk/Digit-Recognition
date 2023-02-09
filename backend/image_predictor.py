import tensorflow as tf
from model_handler import ModelHandler
import numpy as np


def invert_colors(img):
    return 1 - img


def process_image(img_binary):
    img_tensor = tf.image.decode_jpeg(img_binary)
    img_gray = tf.image.rgb_to_grayscale(img_tensor)
    img_resized = tf.image.resize(img_gray, (28, 28))
    img_inverted = invert_colors(img_resized)
    return img_inverted


class ImagePredictor:
    def __init__(self):
        self.model_handler = ModelHandler()
        self.model = self.model_handler.model
        self.pred = None
        self.probs = []

    def __call__(self, img):
        image = process_image(img)
        res = self.model.predict(image)
        self.pred = np.argmax(res)
        self.probs = res * 100
        return self.pred, self.probs
