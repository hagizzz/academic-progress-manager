-   Viet route

    -   GET /course trả về thông tin tất cả các course
    -   GET /course/:id trả về thông tin của course với id tương ứng, kèm danh điểm của tất cả các student tham gia course đó
        ví dụ dữ liệu trả về: {
        id: 3,
        year: 2021,
        term: 1,
        ...
        subject: {
        name: "Đại số tuyến tính",
        credit: 3,
        type: "BB",
        code: "20TTH"
        ...
        },
        students: [
        {
        fullname: "Võ Hà Giang",
        code: "20110172",
        gender: "Nữ",
        ...,
        score: 10,
        },
        {
        fullname: "Võ Hà Giang 2",
        code: "20110217",
        gender: "Nam",
        ...,
        score: 10,
        }

        ]

    }
