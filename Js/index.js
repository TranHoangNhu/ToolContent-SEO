// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm tính toán mật độ từ khóa
function calculateDensity() {
  // Lấy giá trị từ trường nhập liệu và loại bỏ dấu tiếng Việt
  let keyword = document.getElementById("keyword").value.trim().toLowerCase();
  let content = document.getElementById("content").value.trim().toLowerCase();

  if (!keyword || !content) {
    alert("Vui lòng nhập cả từ khóa và nội dung.");
    return;
  }

  // Loại bỏ dấu tiếng Việt khỏi từ khóa và nội dung
  keyword = removeVietnameseTones(keyword);
  content = removeVietnameseTones(content);

  // Sử dụng regex để đếm số lần từ khóa xuất hiện trong đoạn văn
  const regex = new RegExp(keyword.split(/\s+/).join(".*?"), "gi");
  const matches = content.match(regex);
  const keywordCount = matches ? matches.length : 0;

  // Hiển thị số lần xuất hiện
  document.getElementById("keywordCount").textContent = keywordCount;

  // Tính mật độ từ khóa (giả định đoạn văn đã nhập không cần tách từ)
  const totalWords = content.split(/\s+/).length;
  const keywordDensity = (keywordCount / totalWords) * 100;

  // Hiển thị mật độ từ khóa
  document.getElementById("keywordDensity").textContent =
    keywordDensity.toFixed(2);
}

// Hàm cập nhật số ký tự và từ
function updateWordAndCharacterCount() {
  const content = document.getElementById("content").value.trim();

  // Tính tổng số ký tự
  const totalCharacters = content.length;

  // Tính tổng số từ (loại bỏ các từ rỗng do khoảng trắng)
  const words = content.split(/\s+/);
  const totalWords = words.filter((word) => word.length > 0).length;

  // Hiển thị tổng số ký tự và từ
  document.getElementById("totalCharacters").textContent = totalCharacters;
  document.getElementById("totalWords").textContent = totalWords;
}

// Sự kiện input để cập nhật số ký tự và từ liên tục
const contentTextarea = document.getElementById("content");
contentTextarea.addEventListener("input", updateWordAndCharacterCount);
