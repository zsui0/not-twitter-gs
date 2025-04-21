$(function (){

  loadPosts()

  var $name = $('#fullName')
  var $title = $('#postName')
  var $content = $('#postText')

  $('#add-post').on('click', function(e) {
    
    e.preventDefault();

    if($name.val() && $title.val() && $content.val()){
      $.ajax({
        type: 'POST',
        url: '/posts',
        data: {
          name: $name.val(),
          title: $title.val(),
          content: $content.val()
        },
        success: function(){
          console.log('success posting')
          loadPosts()
        },
        error: function(){
          alert('error saving post')
        }
      })
    }
    else{
      alert("Kérlek tölts ki mindent!")
    }
  });

  $('#posts').on('click', '.moreLessBtn', function(){

    var dots = $(this).parent().parent()[0].querySelector('.dots')
    var moreText = $(this).parent().parent()[0].querySelector('.more')
    var btnText = $(this)[0]


    if(dots.style.display === "none"){
      dots.style.display = "inline"
      btnText.innerHTML = "Több mutatása"
      moreText.style.display = "none"
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Elrejtés";
      moreText.style.display = "inline";
    }

  });

});

function loadPosts(){

  var $posts = $('#posts')

  $.ajax({
    type: 'GET',
    url: '/posts',
    success: function(posts) {
      $posts.empty()

      $.each(posts, function(i, post){

        var lessmore = ""
        var lessmorebutton = ""

        if(post.PostText.length > 100)
        {
          lessmore = post.PostText.substring(0,100) + `<span class="dots">...</span><span class="more">`+post.PostText.substring(100,post.PostText.length-1)+`</span>`
          lessmorebutton = `<span class="moreLessSpan"><button class="btn btn-primary moreLessBtn">Több Mutatása</button></span>`
        }
        else 
        {
          lessmore = post.PostText
        }
        
        var utcDate = post.Date;  // ISO-8601 formatted date returned from server
        var localDate = new Date(utcDate);

        $posts.append(`<div class="post">
                        <svg height="50" width="50">
                          <circle r="18" cx="25" cy="25" fill="grey" />
                        </svg>
                        <span class="postFullName">`+ post.Name +`</span><span class="postDate">`+ localDate.toLocaleString() +`</span><br>
                        <span class="postName">` + post.PostTopic +`</span>
                        <span class="postText"><p>` + lessmore + `</p></span>
                        `+ lessmorebutton +`
                      </div> 
          `)
      })
    },
    error: function() {
      alert('error loading orders')
    }
  });
}