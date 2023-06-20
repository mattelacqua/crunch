from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


from ..models import Application

@csrf_exempt
@api_view(['GET'])
def import_csv(request):
    data = request.data
    print(data)
    return HttpResponse("TODO: IMPLEMENT Application read")