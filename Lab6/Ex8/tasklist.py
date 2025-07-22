from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

tasks = [] # Global list to store tasks

# This route handles both displaying the list (GET) and adding new tasks (POST)
@app.route('/tasks', methods=['GET', 'POST'])
def task_list():
    if request.method == 'POST':
        new_task = request.form.get('task')
        if new_task:
            tasks.append(new_task)
        # Redirect back to the '/tasks' URL to refresh the page after adding a task
        return redirect(url_for('task_list'))
    # For GET requests, render the template and pass the current tasks
    return render_template('tasklist.html', tasks=tasks)

if __name__ == '__main__':
    # Run the app in debug mode, which auto-reloads on code changes
    app.run(debug=True)