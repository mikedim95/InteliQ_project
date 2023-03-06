import subprocess
from pathlib import Path
import json

def validateJSON(jsonData):
    try:
        json.loads(jsonData)
    except ValueError as err:
        return False
    return True

def capture(command):
	proc = subprocess.Popen(command,
		stdout = subprocess.PIPE,
		stderr = subprocess.PIPE,
	)
	out,err = proc.communicate()
	return out, err, proc.returncode

def test_healthcheck():
	home = str(Path.home())
	command = ["se2250", "healthcheck"]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_questionnaire():
	home = str(Path.home())
	command = ["se2250", "questionnaire", "--questionnaire_id", "QQ000", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"200" in out
	assert validateJSON(out[4:])

def test_questionnaire_notfound():
	home = str(Path.home())
	command = ["se2250", "questionnaire", "--questionnaire_id", "QQ", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"402" in out

def test_question():
	home = str(Path.home())
	command = ["se2250", "question", "--questionnaire_id", "QQ000", "--question_id", "P00", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"200" in out
	assert validateJSON(out[4:])

def test_question_notfound():
	home = str(Path.home())
	command = ["se2250", "question", "--questionnaire_id", "QQ", "--question_id", "P00", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"402" in out


def test_doanswer():
	home = str(Path.home())
	command = ["se2250", "doanswer", "--questionnaire_id", "QQ000", "--question_id", "P00", "--session_id", "test", "--option_id", "test"]
	out, err, exitcode = capture(command)
	assert b"200" in out

def test_getsessionanswers():
	home = str(Path.home())
	command = ["se2250", "getsessionanswers", "--questionnaire_id", "QQ000",  "--session_id", "test", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"200" in out
	assert b"\"ans\": \"test\"" in out
	assert validateJSON(out[4:])

def test_getsessionanswers_notfound():
	home = str(Path.home())
	command = ["se2250", "getsessionanswers", "--questionnaire_id", "QQ",  "--session_id", "test", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"402" in out

def test_getquestionanswers():
	home = str(Path.home())
	command = ["se2250", "getquestionanswers", "--questionnaire_id", "QQ000",  "--question_id", "P00", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"200" in out
	assert b"\"ans\": \"test\"" in out
	assert validateJSON(out[4:])

def test_getquestionanswers_notfound():
	home = str(Path.home())
	command = ["se2250", "getquestionanswers", "--questionnaire_id", "QQ",  "--question_id", "P00", "--testing", "y"]
	out, err, exitcode = capture(command)
	assert b"402" in out

