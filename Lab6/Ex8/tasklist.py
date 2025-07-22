from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = [] 
@app.route('/tasks', methods=['GET', 'POST'])
def task_list():
    if request.method == 'POST':
        new_task = request.form.get('task')
        if new_task:
            tasks.append(new_task)
        return redirect(url_for('task_list'))
    return render_template('tasklist.html', tasks=tasks)
if __name__ == '__main__':
    app.run(debug=True)