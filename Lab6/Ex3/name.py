from flask import Flask, render_template, request
app = Flask(__name__)
@app.route('/input')
def student():
    return render_template('flask.html')
@app.route('/result', methods=['POST', 'GET'])
def result():
    if request.method == 'POST':
        user_input = request.form
        return render_template("result.html", result=user_input)
    if __name__ == '__main__':
        app.run(debug=True)