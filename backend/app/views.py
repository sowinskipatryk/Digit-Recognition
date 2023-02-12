from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from image_predictor import ImagePredictor
import json

predict = ImagePredictor()


def index(request):
    return redirect('http://localhost:3000/')


@api_view(['GET', 'POST'])
def recognize(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        img = data['image']
        pred, probs = predict(img)
        data = {'pred': pred, 'probs': probs}
        return Response(data)
