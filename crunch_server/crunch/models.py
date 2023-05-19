from django.db import models

# Create your models here.

# User Table (ID is implicitly added)
class User(models.Model):
    name = models.CharField(max_length=64)
    birth_date = models.DateField()
    email = models.CharField(max_length=64)
    phone = models.CharField(max_length=16)
    linkedin = models.CharField(max_length=128)
    github = models.CharField(max_length=128)
    facebook = models.CharField(max_length=128)
    twitter = models.CharField(max_length=128)
    personal = models.CharField(max_length=128)

# Education Table
class Education(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    school = models.CharField(max_length=64)
    degree = models.CharField(max_length=64)
    major = models.CharField(max_length=64)
    gpa = models.CharField(max_length=64)
    start_date = models.DateField()
    end_date = models.DateField()

# Experience Table
class Experience(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=64)
    company = models.CharField(max_length=64)
    city = models.CharField(max_length=16)
    state = models.CharField(max_length=16)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.CharField(max_length=2500)

# Reference Table
class Reference(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    phone = models.CharField(max_length=16)
    company = models.CharField(max_length=64)
    role = models.CharField(max_length=64)

# Application Table
class Application(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    code = models.CharField(max_length=16)
    position = models.CharField(max_length=64)
    company = models.CharField(max_length=64)
    req_no = models.CharField(max_length=16)
    city = models.CharField(max_length=16)
    state = models.CharField(max_length=16)
    remote = models.CharField(max_length=16)
    apply_date = models.DateField()
    posted_sal_lb = models.IntegerField()
    posted_sal_up = models.IntegerField()
    estimate_sal_lb = models.IntegerField()
    estimate_sal_up = models.IntegerField()
    link = models.CharField(max_length=128)
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)

# Address Table
class Address(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    street = models.CharField(max_length=64)
    street2 = models.CharField(max_length=64)
    city = models.CharField(max_length=16)
    state = models.CharField(max_length=16)
    county = models.CharField(max_length=16)
    country = models.CharField(max_length=16)
    zip = models.CharField(max_length=16)