// 2.3.1
let user_t = {
    name: "Roman",
    surname: "Pavlenko"
};

// 2.3.2
let student_t = {
    speciality: 122,
    group: "TR-14",
    changeData: function(speciality, group) {
        this.speciality = speciality;
        this.group = group;
    },
    deleteData: function() {
        this.speciality = undefined;
        this.group = undefined;
    },
    addData: function(speciality) {
        this.speciality = [this.speciality, speciality];
    }
};
console.log(student_t.speciality);
student_t.addData(132);
console.log(student_t.speciality);

// 2.3.3
let clone = {}
for (let key in user_t) {
    clone [key] = user_t [key];
}
for (let key in student_t) {
    clone [key] = student_t [key];
}
console.log(clone);

// 2.3.4
function Student(speciality, group) {
    this.speciality = speciality
    this.group = group
    this.changeData = function(speciality, group) {
        this.speciality = speciality;
        this.group = group;
    },
    this.deleteData = function() {
        this.speciality = undefined;
        this.group = undefined;
    },
    this.addData = function(speciality) {
        this.speciality = [this.speciality, speciality];
    }
}
Student.prototype.showData = function() {
    return "Спеціальність: " + this.speciality + ", Група: " + this.group;
};
let student = new Student(122, "TR-14")
console.log(student.showData())

// 2.3.5
function Progress(speciality, group) {
    Student.call(this, speciality, group)
    this.test = []
    this.attempt = 0
    this.marks = []
    this.countAverageMark = function() {
        let sumOfMarks = 0
        for (let mark of this.marks) {
            sumOfMarks += mark
        }
        return sumOfMarks / this.marks.length
    }
    this.showData = function() {
        return "Спеціальність: " + this.speciality + ", Група: " + this.group + ", Спроба: " + this.attempt + ", Оцінки: " + (this.marks.length > 0 ? this.marks : "ще немає оцінок")
    }
}
let progress = new Progress(122, "TR-14")
console.log(progress.showData())
progress.marks.push(10)
progress.marks.push(12)
progress.marks.push(2)
console.log(progress.countAverageMark())

// 2.3.6
class User {
    constructor (name, surname) {
        this.name = name;
        this.surname = surname;
    }

    showData() {
        return "Ім'я: " + this.name + ", Прізвище: " + this.surname;
    }
    
    set name(val) {
        if (val.length < 4) {
            alert("Надто коротке ім'я")
            return
        }
        this._Name = val
    }

    get name() {
        return this._Name
    }

    set surname(val) {
        if (val.length < 4) {
            alert("Надто коротке прізвище")
            return
        }
        this._Surname = val
    }

    get surname () {
        return this._Surname
    }
} 

class StudentClass extends User {
    constructor (name, surname, speciality, group) {
        super(name, surname)
        this.speciality = speciality;
        this.group = group;
    }

    changeSpeciality(speciality) {
        this.speciality = speciality;
    }

    changeGroup(group) {
        this.group = group;
    }

    showData() {
        return super.showData() + ", Спеціальність: " + this.speciality + ", Група: " + this.group;
    }

    set speciality(val) {
        if (val > 300 || val < 0) {
            alert("Некоректна спеціальність")
            return
        }
        this._Speciality = val
    }

    get speciality () {
        return this._Speciality
    }

    set group(val) {
        if (val.length != 5) {
            alert("Некоректна група")
            return
        }
        this._Group = val
    }

    get group () {
        return this._Group
    }
}
let myStudent = new StudentClass("Roman", "Pavlenko", 122, "TR-14")
console.log(myStudent.showData())

class StudentProgress extends StudentClass {
    constructor(name, surname, speciality, group) {
        super(name, surname, speciality, group)
        this.test = [];
        this.attempt = 0;
        this.marks = [];
    }

    countAverageMark() {
        let sumOfMarks = 0;
        for (let mark of this.marks) {
            sumOfMarks += mark;
        }
        return sumOfMarks / this.marks.length;
    };

    showData() {
        return super.showData() + ", Спроба: " + this.attempt + ", Оцінки: " + (this.marks.length > 0 ? this.marks : "ще немає оцінок");
    };
}
let myProgress = new StudentProgress("Roman", "Pavlenko", 122, "TR-14")
console.log(myProgress.showData())