import click
import requests 
import json
import sys
import random
import string

def validateJSON(jsonData):
    try:
        json.loads(jsonData)
    except ValueError as err:
        return False
    return True

def query_yes_no(question, default="yes"):
    valid = {"yes": True, "y": True, "ye": True, "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = input().lower()
        if default is not None and choice == "":
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' " "(or 'y' or 'n').\n")


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
    #print("Random string of length", length, "is:", result_str)

@click.group()
def cli():
    pass

# ---------- healthcheck  ----------------------------------------

@cli.command()
def healthcheck():
    url = "http://localhost:9103/admin/healthcheck"
    try:
        r = requests.get(url)
        print(r.status_code)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)

# ---------- resetall  ----------------------------------------

@cli.command()
def resetall():
    url = "http://localhost:9103/admin/resetall"
    try:
        r = requests.post(url)
        print(r.status_code)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)


# ---------- questionnaire_upd  ----------------------------------------

@cli.command()
@click.option('--source', type=str, help='Questionnaire JSON file name', prompt=True, required=True)
def questionnaire_upd(source):
    url = "http://localhost:9103/admin/questionnaire_upd"
    try:    
        with open(source, encoding="utf-8") as f:
            data = json.load(f)
    except IOError:
        print("Could not read file:", source)
    
    try:
        r = requests.post(url, json=data)
        print(r.status_code)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)


# ---------- resetq  ----------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
def resetq(questionnaire_id):
    url = "http://localhost:9103/admin/resetq/" + questionnaire_id
    try:
        r = requests.post(url)
        print(r.status_code)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)


# ---------- questionnaire  ----------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
@click.option('--testing', type=str, help='for testing purposes', required=False, default="n")
def questionnaire(questionnaire_id, testing):
    url = "http://localhost:9103/questionnaire/" + questionnaire_id
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)
    if r.status_code == 404:
        print(r.status_code)
        print("No questionnaire with ID =", questionnaire_id,"found in database")
        return
    print(r.status_code)
    data = json.loads(r.text)
    if (testing=="y"):
        print(json.dumps(data))
    else:
        print("\n",json.dumps(data, indent=2,ensure_ascii=False).encode('utf8').decode())


# ---------- question  ---------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
@click.option('--question_id', type=str, help='Question ID', prompt=True, required=True)
@click.option('--testing', type=str, help='for testing purposes', required=False, default="n")
def question(questionnaire_id, question_id, testing) :
    url = "http://localhost:9103/question/" + questionnaire_id + "/" + question_id
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)
    if r.status_code == 404:
        print(r.status_code)
        print("Not found in database")
        return
    print(r.status_code)
    data = json.loads(r.text)
    if (testing=="y"):
        print(json.dumps(data))
    else:
        print("\n",json.dumps(data, indent=2,ensure_ascii=False).encode('utf8').decode())

# ---------- doanswer  ---------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
@click.option('--question_id', type=str, help='Question ID', prompt=True, required=True)
@click.option('--session_id', type=str, help='session ID', prompt=True, required=True)
@click.option('--option_id', type=str, help='option ID', prompt=True, required=True)
def doanswer(questionnaire_id, question_id,session_id, option_id) :
    url = "http://localhost:9103/doanswer/"+ questionnaire_id + "/" + question_id + "/" + session_id + "/" + option_id
    r = requests.post(url).status_code
    if r != 200:
        print("error: answer could not be submited")
        return
    print(r)

# ---------- getsessionanswers  ---------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
@click.option('--session_id', type=str, help='session ID', prompt=True, required=True)
@click.option('--testing', type=str, help='for testing purposes', required=False, default="n")
def getsessionanswers(questionnaire_id, session_id, testing) :
    url = "http://localhost:9103/getsessionanswers/"+ questionnaire_id + "/"  + session_id 
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)
    if r.status_code == 404:
        print(r.status_code)
        print("Not found in database")
        return
    data = json.loads(r.text)
    print(r.status_code)
    if (testing=="y"):
        print(json.dumps(data))
    else:
        print("\n",json.dumps(data, indent=2,ensure_ascii=False).encode('utf8').decode())


# ---------- getquestionanswers  ---------------------------------------

@cli.command()
@click.option('--questionnaire_id', type=str, help='Questionnaire ID', prompt=True, required=True)
@click.option('--question_id', type=str, help='Question ID', prompt=True, required=True)
@click.option('--testing', type=str, help='for testing purposes', required=False, default="n")
def getquestionanswers(questionnaire_id, question_id, testing) :
    url = "http://localhost:9103/getquestionanswers/"+ questionnaire_id + "/"  + question_id 
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)
    if r.status_code == 404:
        print(r.status_code)
        print("Not found in database")
        return
    data = json.loads(r.text)
    print(r.status_code)
    if (testing=="y"):
        print(json.dumps(data))
    else:
        print("\n",json.dumps(data, indent=2,ensure_ascii=False).encode('utf8').decode())


# ---------- fill questionnaire  ---------------------------------------

@cli.command()
@click.option('--qid', type=str, help='Questionnaire ID', prompt=True, required=True)
def doall(qid):
    url = "http://localhost:9103/questionnaire/" + qid
    try:
        r = requests.get(url)
    except requests.exceptions.RequestException as e:  
        raise SystemExit(e)
    if r.status_code == 404:
        print("No questionnaire ID =", qid,"found in database")
        return

    questionnaire = json.loads(r.text)
    title = questionnaire['questionnaireTitle']

    questions = questionnaire['questions']

    while True:
        session = get_random_string(4)
        r  =  requests.get("http://localhost:9103/sessioncheck/" + session).text
        if (r == "false"):
            break
    
    print("Session with ID ", session, "for questionnaire", qid,  "succesfully started")

    print("Questionnaire title:", title)
    
    question = questions[0]['qID']

    while question !="-":
        r  =  requests.get("http://localhost:9103/question/" + qid + "/" + question)
        data = json.loads(r.text)

        print(data["qtext"])
        if (len(data['options']) ==1):
            answer = input()
            url = "http://localhost:9103/doanswer/"+ qid + "/" + question + "/" + session + "/" + answer
            r = requests.post(url).status_code
            if r != 200:
                print("error: answer could not be submited")
                break
            question = data['options'][0]["nextqID"]
            print("\n")
        else:
            optID = [0] * len(data['options'])
            nextID = [0] * len(data['options'])
            for i,option in enumerate(data['options']):
                print(i+1, ".", option['opttxt'])
                optID[i] = option['optID']
                nextID[i] = option['nextqID']

            while True:    
                answer = input("Enter your answer (number: 1-" + str(i+1) + "): \n")
                try:
                    answer = int(answer)
                    if answer <= i + 1 and answer >0: 
                        url = "http://localhost:9103/doanswer/"+ qid + "/" + question + "/" + session + "/" + optID[answer-1]
                        r = requests.post(url).status_code
                        if r != 200:
                            print("error: answer could not be submited")
                        break
                except ValueError:
                    print("Wrong input. Enter your answer from 1-",i)
            question = nextID[answer-1]
            print("\n")
        
    print("session with ID", session, "completed successfully")

                

        

