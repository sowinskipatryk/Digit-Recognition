import tensorflow as tf
import matplotlib.pyplot as plt
import os

PATH = "./model"


class ModelHandler:
    def __init__(self):
        self.model = None
        self.train_images = None
        self.train_labels = None
        self.test_images = None
        self.test_labels = None
        self.test_loss = None
        self.test_acc = None
        if os.path.exists(PATH):
            self.load_model(PATH)
        else:
            self.build_model(PATH)

    def build_model(self, path):
        self.load_dataset()
        self.reduce_values_range()
        self.create_model()
        self.compile_model()
        self.fit_model()
        self.save_model(path)

    def load_dataset(self):
        mnist_dataset = tf.keras.datasets.mnist
        (self.train_images, self.train_labels), (self.test_images,
                                                 self.test_labels
                                                 ) = mnist_dataset.load_data()

    def reduce_values_range(self):
        self.train_images = self.train_images / 255.
        self.test_images = self.test_images / 255.

    def show_image(self, idx):
        plt.imshow(self.train_images[idx])
        plt.show()

    def create_model(self):
        self.model = tf.keras.models.Sequential()
        self.model.add(tf.keras.layers.Conv2D(32, (3, 3), activation='relu',
                                              input_shape=(28, 28, 1)))
        self.model.add(tf.keras.layers.MaxPooling2D((2, 2)))
        self.model.add(tf.keras.layers.Conv2D(64, (3, 3), activation='relu'))
        self.model.add(tf.keras.layers.MaxPooling2D((2, 2)))
        self.model.add(tf.keras.layers.Flatten())
        self.model.add(tf.keras.layers.Dense(64, activation='relu'))
        self.model.add(tf.keras.layers.Dense(10, activation='softmax'))

    def compile_model(self):
        self.model.compile(optimizer='adam',
                           loss=tf.keras.losses.SparseCategoricalCrossentropy(
                               from_logits=True),
                           metrics=['accuracy'])

    def fit_model(self, epochs=5):
        self.model.fit(self.train_images, self.train_labels,
                       epochs=epochs,
                       validation_data=(self.test_images, self.test_labels))

    def save_model(self, path):
        self.model.save(path)

    def model_summary(self):
        print(self.model.summary())

    def load_model(self, path):
        self.model = tf.keras.models.load_model(path)

    def evaluate_model(self):
        self.load_dataset()
        self.test_loss, self.test_acc = self.model.evaluate(self.test_images,
                                                            self.test_labels,
                                                            verbose=1)
        print('Test accuracy:', self.test_acc)
        print('Test loss:', self.test_loss)

    def predict(self, img):
        res = self.model.predict(img)
        return res
