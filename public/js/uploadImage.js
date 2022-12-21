/* selection */
const imageInput = document.querySelector("input#updateInputAvatar");
const imgTag = document.querySelector("img#avatarPreview");
const uploadProfileImgBtn = document.querySelector("button#saveAvatarImage");

/* image input event */

imageInput.addEventListener("change", function (e) {
  const imageFile = this.files[0];
  if (this.files && imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgTag.src = this.result;
    };
    reader.readAsDataURL(imageFile);
  }
});
