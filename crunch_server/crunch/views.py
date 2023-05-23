from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


from .models import User

import json
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# Find the user in the database

@csrf_exempt
@api_view(['GET', 'POST'])
def users(request):
    # If looking up user
    if request.method == 'GET':
        lookup_id = request.GET.get('id')
        print(f"Looking up user with id: {lookup_id}")

        # .values converts to json dict
        lookup_res = User.objects.filter(id=lookup_id).values()

        if not lookup_res:
            print(f"Did not find {lookup_id} in database")
            return HttpResponseNotFound("Did not find in database")
        else:
            data = lookup_res[0]
            print(f"Found in database: {data}")
            
            # Parse to user json for front end
            user = {}
            user['id'] = data['id']
            user['name'] = data['name']
            user['birth'] = data['birth_date'].strftime('%m/%d/%Y')
            user['email'] = data['email']
            user['phone'] = data['phone']
            user['linkedin'] = data['linkedin']
            user['github'] = data['github']
            user['facebook'] = data['facebook']
            user['twitter'] = data['twitter']
            user['personal'] = data['personal']

            return HttpResponse(json.dumps(user), content_type='application/json')

    # if adding a user
    if request.method == 'POST':
        print(f"Adding to database: {request.data}")

        # Parse the information
        data = request.data

        name = data['name']
        birth_date = data['birth'].split('/')
        month = birth_date[0] if len(birth_date[0]) == 2 else '0'+birth_date[0]
        day = birth_date[1] if len(birth_date[1]) == 2 else '0'+birth_date[1]
        year = birth_date[2]
        birth_date = '-'.join([year, month, day])
        email = data['email']
        phone = data['phone']
        linkedin = data['linkedin']
        github = data['github']
        facebook = data['facebook']
        twitter = data['twitter']
        personal = data['personal']

        # Check if the user is already in there
        
        

        new_user = User(name=name, birth_date=birth_date, email=email, phone=phone, linkedin=linkedin, github=github, facebook=facebook, twitter=twitter, personal=personal)

        new_user.save()

        print(f"Created new user with id {new_user.id}")
        
        response = {}
        response['msg'] = "Successfully added new_user to db"
        response['id'] = new_user.id

        return HttpResponse(json.dumps(response), content_type='application/json')