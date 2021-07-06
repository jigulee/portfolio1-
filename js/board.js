var frame = $(".community .table");
var url = "data/board.json";
callData(url);

//데이터 호출함수
function callData(url) {
    $.ajax({
        url: url,
        dataType: "json"
    })
        .success(function (data) {
            createTable(frame, data);
        })
        .error(function (err) {
            console.error(err);
        });
}

//테이블 생성 함수
function createTable(target, data) {
    var items = data.data;

    //테이블 태그와 고정영역인 thead와 tbody까지 생성
    target.append(
        $("<table>")
            .append(
                $("<thead>")
                    .append(
                        $("<tr>")
                            .append(
                                "<th>No.</th>",
                                "<th>Title</th>",
                                "<th>Date</th>"
                            )
                    ),
                $("<tbody>")
            )
    );

    var wrap = frame.find("tbody");

    $(items).each(function (index, data) {
        var link = data.link;
        var title = data.title;
        var date = data.date;
        var count = ++index;
        //첨 숫자가 1부터 카운트가 되야되기 때문에
        //전위 연산자로 일단 index0값을 먼저 1증가시킨 다음에 코드에 반영

        //tbody안에 데이터의 갯수만큼 tr생성
        wrap
            .prepend( //최신데이터가 위쪽으로 출력되게 함
                $("<tr>")
                    .append(
                        $("<td>").text(count),
                        $("<td>")
                            .append(
                                $("<a>").attr("href", link).text(title)
                            ),
                        $("<td>").text(date)
                    )
            )
    })
}
