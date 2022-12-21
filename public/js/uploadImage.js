/* selection */
const imageInput = document.querySelector("input#updateInputAvatar");
const imgTag = document.querySelector("img#avatarPreview");
const uploadProfileImgBtn = document.querySelector("button#saveAvatarImage");

/* global variable */
let cropper;

/* image input event */

imageInput.addEventListener("change", function (e) {
  const imageFile = this.files[0];
  if (this.files && imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgTag.src = this.result;
      cropper = new Cropper(imgTag, {
        aspectRatio: 1 / 1,
        background: false,
      });
    };
    reader.readAsDataURL(imageFile);
  }
});

/* upload image */
uploadProfileImgBtn.addEventListener("click", function (e) {
  const fileName = imageInput?.files[0]?.name || `profileAvatar.png`;
  const canvas = cropper?.getCroppedCanvas();
  if (canvas) {
    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append("avatar", blob, fileName);

      /* send data */
      const url = `${window.location.origin}/profile/avatar`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data._id) {
            window.location.reload();
          } else {
            alert("Upload Failed");
          }
        });
    });
  } else {
    alert("Please insert an Image");
  }
});
