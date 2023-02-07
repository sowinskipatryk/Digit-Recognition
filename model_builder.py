import tensorflow as tf

mnist_dataset = tf.keras.datasets.mnist

(train_images, train_labels), (test_images, test_labels) = mnist_dataset.load_data()

train_images = train_images / 255.
test_images = test_images / 255.

model = tf.keras.models.Sequential()

model.add(tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(tf.keras.layers.MaxPooling2D((2, 2)))
model.add(tf.keras.layers.Conv2D(64, (3, 3), activation='relu'))
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(64, activation='relu'))
model.add(tf.keras.layers.Dense(10, activation='softmax'))

# print(model.summary())

model.compile(optimizer='adam', loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=['accuracy'])

with tf.device('GPU:0'):
    model.fit(train_images, train_labels, epochs=5, validation_data=(test_images, test_labels))

tf.saved_model.save(model, "digit_recognition_model")

test_loss, test_acc = model.evaluate(test_images, test_labels, verbose=1)

# print('Test accuracy:', test_acc)
