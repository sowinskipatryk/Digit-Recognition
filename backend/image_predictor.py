import tensorflow as tf
from model_handler import ModelHandler
import numpy as np
import base64
from PIL import Image


def process_image(img_enc):
    img_bin = base64.b64decode(img_enc[img_enc.index(',') + 1:])
    # with open('image.jpg', 'wb') as f:
    #     f.write(img_bin)
    img_tensor = tf.image.decode_jpeg(img_bin, channels=4)
    img_norm = tf.cast(img_tensor, tf.float32) / 255.0
    img_skipfirst = img_norm[:, :, 1:]
    img_gray = tf.image.rgb_to_grayscale(img_skipfirst)
    img_resized = tf.image.resize(img_gray, (28, 28))
    img_extrap = tf.where(img_resized > 0.1, 1, img_resized)
    img_expand = tf.expand_dims(img_extrap, axis=0)
    return img_expand


class ImagePredictor:
    def __init__(self):
        self.mhandler = ModelHandler()
        self.pred = None
        self.probs = []

    def __call__(self, img):
        image = process_image(img)
        res = self.mhandler.predict(image)[0]
        self.pred = np.argmax(res)
        self.probs = res * 100
        return self.pred, self.probs
