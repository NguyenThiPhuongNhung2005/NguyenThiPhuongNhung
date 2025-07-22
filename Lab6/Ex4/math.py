from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('math.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    if request.method == 'POST':
        try:
            number = int(request.form['number'])
            square = number * number
            return render_template('math_result.html', number=number, square=square)
        except ValueError:
            return "Please enter a valid number."
    return "Invalid request."

if __name__ == '__main__':
    app.run(debug=True)