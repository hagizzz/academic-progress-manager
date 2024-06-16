-- Liệt kê các học phần mà 1 sinh viên đã đăng kí
SELECT
	concat(right(year,2), "-", right(year+1,2), "/", term) as "NH/HK",
	concat(subject.code, " - ", subject.name) as 'Môn học',
	concat(student.code, " - ", student.fullname) as 'Sinh viên',
	subject.subjectType as 'Loại học phần',
	credit as 'Số tín chỉ',
	classroom.code as 'Lớp', enroll_course.score as 'Điểm'
FROM enroll_course
INNER JOIN student ON enroll_course.studentId = student.id
INNER JOIN course ON enroll_course.courseId = course.id
INNER JOIN subject ON course.subjectId = subject.id
INNER JOIN classroom ON course.classroomId = classroom.id
WHERE student.code = '20110172';

-- Tính điểm trung bình tích lũy của từng sinh viên
SELECT student.code as 'MSSV', student.fullname as 'Tên SV',
	sum(credit) as 'Số tín chỉ tích lũy',
	round(sum(score*credit)/sum(credit),2) as 'Điểm trung bình tích lũy'
FROM enroll_course
INNER JOIN student ON enroll_course.studentId = student.id
INNER JOIN course ON enroll_course.courseId = course.id
INNER JOIN subject ON course.subjectId = subject.id
WHERE score > 5
GROUP BY student.id;