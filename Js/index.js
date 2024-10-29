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

  // Tách nội dung thành các đoạn (dựa trên dấu xuống dòng)
  const paragraphs = content.split(/\n+/); // Tách đoạn bằng ký tự xuống dòng

  let keywordCount = 0;

  // Sử dụng RegExp để đếm số lần xuất hiện của từ khóa trong mỗi đoạn
  const regex = new RegExp(keyword, "gi"); // 'g' để tìm tất cả, 'i' để không phân biệt hoa thường

  paragraphs.forEach((paragraph) => {
    const matches = paragraph.match(regex); // Tìm tất cả các lần xuất hiện của từ khóa
    if (matches) {
      keywordCount += matches.length; // Cộng số lần xuất hiện trong đoạn vào tổng
    }
  });

  // Hiển thị số lần xuất hiện từ khóa
  document.getElementById("keywordCount").textContent = keywordCount;

  // Tính mật độ từ khóa dựa trên tổng số từ trong toàn bộ nội dung
  const totalWords = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
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
