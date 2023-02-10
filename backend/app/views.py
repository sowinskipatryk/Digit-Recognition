from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from image_predictor import ImagePredictor
import json


def index(request):
    return redirect('http://localhost:3000/')


@api_view(['GET', 'POST'])
def recognize(request):
    data = json.loads(request.body)
    img = data['image']
    # print(img)
    # data = {'pred': 1, 'probs': [0, 80, 20] + 7*[0]}
    predict = ImagePredictor()
    pred, probs = predict(img)
    data = {'pred': pred, 'probs': probs}
    return Response(data)
