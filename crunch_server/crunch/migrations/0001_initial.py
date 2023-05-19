# Generated by Django 4.2.1 on 2023-05-19 20:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('birth_date', models.DateField()),
                ('email', models.CharField(max_length=64)),
                ('phone', models.CharField(max_length=16)),
                ('linkedin', models.CharField(max_length=128)),
                ('github', models.CharField(max_length=128)),
                ('facebook', models.CharField(max_length=128)),
                ('twitter', models.CharField(max_length=128)),
                ('personal', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('email', models.CharField(max_length=64)),
                ('phone', models.CharField(max_length=16)),
                ('company', models.CharField(max_length=64)),
                ('role', models.CharField(max_length=64)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crunch.user')),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(max_length=64)),
                ('company', models.CharField(max_length=64)),
                ('city', models.CharField(max_length=16)),
                ('state', models.CharField(max_length=16)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('description', models.CharField(max_length=2500)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crunch.user')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school', models.CharField(max_length=64)),
                ('degree', models.CharField(max_length=64)),
                ('major', models.CharField(max_length=64)),
                ('gpa', models.CharField(max_length=64)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crunch.user')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=16)),
                ('position', models.CharField(max_length=64)),
                ('company', models.CharField(max_length=64)),
                ('req_no', models.CharField(max_length=16)),
                ('city', models.CharField(max_length=16)),
                ('state', models.CharField(max_length=16)),
                ('remote', models.CharField(max_length=16)),
                ('apply_date', models.DateField()),
                ('posted_sal_lb', models.IntegerField()),
                ('posted_sal_up', models.IntegerField()),
                ('estimate_sal_lb', models.IntegerField()),
                ('estimate_sal_up', models.IntegerField()),
                ('link', models.CharField(max_length=128)),
                ('username', models.CharField(max_length=64)),
                ('password', models.CharField(max_length=64)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crunch.user')),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=64)),
                ('street2', models.CharField(max_length=64)),
                ('city', models.CharField(max_length=16)),
                ('state', models.CharField(max_length=16)),
                ('county', models.CharField(max_length=16)),
                ('country', models.CharField(max_length=16)),
                ('zip', models.CharField(max_length=16)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='crunch.user')),
            ],
        ),
    ]
