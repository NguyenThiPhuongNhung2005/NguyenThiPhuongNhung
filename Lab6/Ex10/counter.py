from flask import Flask, render_template
visit_count = 0
app = Flask(__name__)
@app.route('/')
def counter():
    global visit_count
    visit_count += 1
    return render_template('counter.html', count=visit_count)
if __name__ == "__main__":
    app.run(debug=True)