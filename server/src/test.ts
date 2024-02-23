class Person {
    getFriend<T extends Person>(friend: T) {
        return friend
    }
}

class Developer extends Person {
    coding() {
        console.log('console.log()')
    }
}

class Teacher extends Person {}

class Student extends Person {}

const std = new Student()
const dev = new Developer()

const friend = std.getFriend(dev)
friend.coding()
