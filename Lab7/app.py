@app . route ("/")
2 def index () :
3 students = list ( collection . find () )
4 return render_template (" index . html " , students = students )