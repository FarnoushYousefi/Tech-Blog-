const postId = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];
const editButton = document.querySelector('#edit');
console.log(editButton);
const editFormHandler = async function (event) {
  console.log('page loded ************');
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
  });

  document.location.replace('/dashboard');
};

//document.querySelector('#edit').addEventListener('submit', editFormHandler);
document.querySelector('#edit').addEventListener('click', editFormHandler);
document.querySelector('#delete').addEventListener('click', deleteClickHandler);
