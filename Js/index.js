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
  let keyword = document.getElementById("keyword").value.trim().toLowerCase();
  let content = document.getElementById("content").value.trim().toLowerCase();

  if (!keyword || !content) {
    alert("Vui lòng nhập cả từ khóa và nội dung.");
    return;
  }

  // Loại bỏ dấu tiếng Việt khỏi từ khóa và nội dung
  keyword = removeVietnameseTones(keyword);
  content = removeVietnameseTones(content);

  const paragraphs = content.split(/\n+/); // Tách đoạn bằng ký tự xuống dòng
  let keywordCount = 0;
  const regex = new RegExp(keyword, "gi");

  paragraphs.forEach((paragraph) => {
    const matches = paragraph.match(regex);
    if (matches) {
      keywordCount += matches.length;
    }
  });

  document.getElementById("keywordCount").textContent = keywordCount;

  const totalWords = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const keywordDensity = (keywordCount / totalWords) * 100;
  document.getElementById("keywordDensity").textContent =
    keywordDensity.toFixed(2);
}

// Hàm đề xuất số lần xuất hiện từ khóa
function suggestKeywordAppearance() {
  const keyword = document.getElementById("keyword").value.trim();
  const totalWordsInput = document.getElementById("totalWordsInput").value;

  if (!keyword || !totalWordsInput) {
    alert("Vui lòng nhập từ khóa và tổng số từ.");
    return;
  }

  const totalWords = parseInt(totalWordsInput);
  const keywordLength = keyword.split(/\s+/).length; // Độ dài từ khóa

  let suggestedCount = 0;

  if (keywordLength >= 1 && keywordLength <= 4) {
    suggestedCount = ((2.5 / 100) * totalWords) / 4;
  } else if (keywordLength >= 5 && keywordLength <= 9) {
    suggestedCount = ((2.5 / 100) * totalWords) / keywordLength;
  }

  // Xử lý làm tròn
  let result;
  if (suggestedCount % 1 < 0.5) {
    result = Math.floor(suggestedCount); // Nếu dưới 0.5, làm tròn xuống
  } else {
    result = `${Math.floor(suggestedCount)} hoặc ${Math.ceil(suggestedCount)}`; // Nếu từ 0.5 trở lên, hiển thị 2 kết quả
  }

  // Hiển thị kết quả đề xuất
  document.getElementById("suggestedKeywordCount").textContent = result;
}

// Hàm cập nhật số ký tự và từ
function updateWordAndCharacterCount() {
  const content = document.getElementById("content").value.trim();

  const totalCharacters = content.length;
  const words = content.split(/\s+/);
  const totalWords = words.filter((word) => word.length > 0).length;

  document.getElementById("totalCharacters").textContent = totalCharacters;
  document.getElementById("totalWords").textContent = totalWords;
}

const contentTextarea = document.getElementById("content");
contentTextarea.addEventListener("input", updateWordAndCharacterCount);
