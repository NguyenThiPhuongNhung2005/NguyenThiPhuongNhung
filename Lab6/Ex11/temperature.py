from flask import Flask, render_template
app = Flask(__name__)
@app.route('/')
def temperature():
    return render_template('temperature.html')
@app.route('/convert/<float:celsius>')
def convert(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return render_template('temperature.html', celsius=celsius, fahrenheit=fahrenheit)
if __name__ == "__main__":
    app.run(debug=True)