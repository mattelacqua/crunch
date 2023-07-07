from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


from crunch.models import Application

import csv
from io import StringIO

@csrf_exempt
@api_view(['GET', 'POST'])
def import_csv(request):
    print("ASLDKFJALSDKFASDF")
    if request.method == 'GET':
        data = request.data
        print(data)
        return HttpResponse("TODO: IMPLEMENT Application read", content_type='text/html')
    
    # Handle the post
    elif request.method == 'POST':
        # get the form from the request -> temp file -> read to string -> decode from bytes
        form = request.FILES['file'].read().decode(encoding='utf-8-sig') 
        csv_temp = csv.DictReader(StringIO(form)) # string IO to simulate opening a file
        for idx, line in enumerate(csv_temp):
            print(line)
        


        return HttpResponse("POSTED", content_type='text/html')
