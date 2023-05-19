from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound

from .models import User

import json
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# Find the user in the database
def users(request):
    # If looking up user
    if request.method == 'GET':
        lookup_id = request.GET.get('id')
        print(f"Looking up user with id: {lookup_id}")

        # .values converts to json dict
        lookup_res = User.objects.filter(id=lookup_id).values()

        print(f"Lookup Result: {lookup_res}")
        if not lookup_res:
            return HttpResponseNotFound("Did not find in database")
        else:
            data = {}
            data['msg'] = "Found the user in the database"
            data['user'] = lookup_res[0]
            
            return HttpResponse(json.dumps(data), content_type='aplication/json')

    # if adding a user
    if request.method == 'POST':
        print(f"Trying to add to database {request.POST}")