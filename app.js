const baseURL = "http://localhost:3000/"


const $commentsSection = document.querySelector('#comments-section')
const $createCommentForm = document.querySelector('#create-comment-form')

$createCommentForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault()
    const formData = new FormData( event.target )
    const content = formData.get('content')
    addCommentToFront( content )
    addCommentToBack( content )
    event.target.reset()
})

clearSection( $commentsSection )


fetch( baseURL + "comments" )
    .then(response => response.json())
    .then( populateComments )

function clearSection( section ){
    section.innerHTML = ''
}

function addCommentToFront( content ){
    const $newComment = document.createElement( 'li' )
    $newComment.innerText = content
    $newComment.innerText = content
    $commentsSection.append( $newComment )
}

function addCommentToBack( content ){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"content": content});

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/comments", requestOptions)
        .then(response => response.text())
        .then(result =>{
            clearSection( $commentsSection )
            fetch(  "http://localhost:3000/comments" )
                .then(response => response.json())
                .then(populateComments)
        })
        .catch(error => console.log('error', error));
}

function populateComments(comments){
    comments.forEach(comment => {
        const $newListItem = document.createElement('li')
        $newListItem.innerText = comment.content
        $newListItem.id = `comment-${comment.id}`
        $commentsSection.append($newListItem)
    })
}

