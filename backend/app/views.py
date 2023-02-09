from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse
from image_predictor import ImagePredictor

predict = ImagePredictor()


def index(request):
    return HttpResponse({'-A kto to?': '-A ja.'})


@api_view(['POST'])
def recognize(request):
    if request.method == 'POST':
        pred, probs = predict(request.files['img'])
        data = {'pred': pred, 'probs': probs}
        return Response(data)
