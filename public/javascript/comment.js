console.log('loaded');
const commentFormHandler = async function (event) {
  event.preventDefault();

  const post_id = document.querySelector('input[name="post-id"]').value;
  const comment_text = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;

  if (body) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.reload();
  }
};

function toggleCommentForm(event) {
  document.getElementById('formcard').classList.toggle('hide');
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
document
  .querySelector('#comment-btn')
  .addEventListener('click', toggleCommentForm);
