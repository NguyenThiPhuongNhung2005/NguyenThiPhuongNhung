from flask import Flask, render_template_string
app = Flask(__name__)
@app.route('/')
def student_info():
    return render_template_string('DisplayingStudentInformation.html')
if __name__ == '__main__':
    app.run(debug=True)
