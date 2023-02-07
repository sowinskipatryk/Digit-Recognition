from django.shortcuts import render
from django.http import HttpResponse
import tensorflow as tf


def index(request):
    return HttpResponse({'-A kto to?': '-A ja.'})


def digit_recognition(request):
    if request.method == 'POST':
        img_binary = request.files['img']
        img_tensor = tf.image.decode_jpeg(img_binary)
        img_gray = tf.image.rgb_to_grayscale(img_tensor)
        img_resized = tf.image.resize(img_gray, (28, 28))
        res =