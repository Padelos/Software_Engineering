# Generated by Django 4.1.3 on 2022-11-21 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_parkingspot_res'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='parkingspot',
            name='res',
        ),
        migrations.AddField(
            model_name='parkingspot',
            name='res',
            field=models.ManyToManyField(blank=True, default=None, null=True, to='api.reservation'),
        ),
    ]