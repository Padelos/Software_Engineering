import requests

url = 'http://localhost:8000/api/token/'
myobj = {'username': 'george','password':'123123123'} #credentials

x = requests.post(url, json = myobj)

print("RECEIVED ACCESS TOKEN")
print(x.json()['access'])
print()



print("TESTING CONNECTION TO THE API USING BEARER TOKEN")
url2 = 'http://localhost:8000/api/testuser/'
bearer_tk = "Bearer "+x.json()['access']
headers = {"Authorization": bearer_tk}
print(requests.post(url2, headers=headers).json())


print("CHECKING RESERVATIONS FOR PARKING SPOT 1")
bearer_tk = "Bearer "+x.json()['access']
headers = {"Authorization": bearer_tk}
print(requests.get("http://localhost:8000/api/reservations/1", headers=headers).json())


#print('CHECK BOOKING OF RESERVATION FOR PARKING SPOT 1')
#obj = {'parkingId':'2','startDate':'12/12/2022','endDate':'16/12/2022'}
#print(requests.post("http://localhost:8000/api/reservations/book/", headers=headers,json=obj).json())


#print('CHECK RESERVATIONS')
#print(requests.get("http://localhost:8000/api/reservations/", headers=headers).json())



print("CHECK ALL PARKING SPOTS")
print(requests.get("http://localhost:8000/api/spots/", headers=headers).json())



print("CHECK ALL USER RESERVATIONS")
print(requests.get("http://localhost:8000/api/reservations/", headers=headers).json())

#print("DELETING RESERVATION")
#print(requests.delete("http://localhost:8000/api/reservations/delete/7", headers=headers).json())


###Days testing algorithm
#from datetime import datetime

# datetime object containing current date and time

#print("date and time =", now)	
#end =  now + timedelta(days=10)
#print("end date and time =", end)	
'''
def getDuration(then, now = datetime.now(), interval = "default"):

    # Returns a duration as specified by variable interval
    # Functions, except totalDuration, returns [quotient, remainder]

    duration = now - then # For build-in functions
    duration_in_s = duration.total_seconds() 
    
    def years():
      return divmod(duration_in_s, 31536000) # Seconds in a year=31536000.

    def days(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 86400) # Seconds in a day = 86400

    def hours(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 3600) # Seconds in an hour = 3600

    def minutes(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 60) # Seconds in a minute = 60

    def seconds(seconds = None):
      if seconds != None:
        return divmod(seconds, 1)   
      return duration_in_s

    def totalDuration():
        y = years()
        d = days(y[1]) # Use remainder to calculate next variable
        h = hours(d[1])
        m = minutes(h[1])
        s = seconds(m[1])

        return "Time between dates: {} years, {} days, {} hours, {} minutes and {} seconds".format(int(y[0]), int(d[0]), int(h[0]), int(m[0]), int(s[0]))

    return {
        'years': int(years()[0]),
        'days': int(days()[0]),
        'hours': int(hours()[0]),
        'minutes': int(minutes()[0]),
        'seconds': int(seconds()),
        'default': totalDuration()
    }[interval]
'''
#print('Time Difference ' + str(getDuration(now,end,'days')))
#for i in range(getDuration(now,end,'days')):
#    day = now + timedelta(days=i)
#    print(day)