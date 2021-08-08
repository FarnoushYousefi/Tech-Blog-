const postId = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').innerHTML;
  // console.log(document.querySelector('.title'));
  // console.log(document.querySelector('.meta'));
  console.log(title, body);
  await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location.replace('/');
};

const deleteClickHandler = async function () {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  document.location.replace('/');
};

//document.querySelector('#edit').addEventListener('submit', editFormHandler);
document.querySelector('#id-update').addEventListener('click', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
