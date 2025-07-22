from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# Thiết lập kết nối MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["students_db"]  # Chọn cơ sở dữ liệu
collection = db["students"] # Chọn collection (bảng)

# Trang chủ - Hiển thị danh sách sinh viên
@app.route("/")
def index():
    students = list(collection.find())
    return render_template("index.html", students=students)

# Thêm sinh viên mới
@app.route("/add", methods=["GET", "POST"])
def add_student():
    if request.method == "POST":
        name = request.form["name"]
        age = request.form["age"]
        major = request.form["major"]
        
        # Chèn dữ liệu vào MongoDB
        collection.insert_one({"name": name, "age": int(age), "major": major})
        return redirect(url_for("index")) # Chuyển hướng về trang chủ
    return render_template("form.html") # Hiển thị form thêm sinh viên

# Sửa thông tin sinh viên
@app.route("/edit/<string:student_id>", methods=["GET", "POST"])
def edit_student(student_id):
    student = collection.find_one({"_id": ObjectId(student_id)})
    if request.method == "POST":
        new_name = request.form["name"]
        new_age = request.form["age"]
        new_major = request.form["major"]
        
        # Cập nhật dữ liệu trong MongoDB
        collection.update_one(
            {"_id": ObjectId(student_id)},
            {"$set": {"name": new_name, "age": int(new_age), "major": new_major}}
        )
        return redirect(url_for("index"))
    return render_template("form.html", student=student) # Hiển thị form sửa thông tin

# Xóa sinh viên
@app.route("/delete/<string:student_id>")
def delete_student(student_id):
    collection.delete_one({"_id": ObjectId(student_id)})
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True) # Chạy ứng dụng Flask ở chế độ debug