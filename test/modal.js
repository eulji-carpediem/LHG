/* =========================
   공통 모달 컴포넌트 스크립트
   - 투버튼 모달 / 원버튼 모달 공통 처리
   - 확인 버튼 클릭 시 특정 페이지 이동
   - 취소 버튼 또는 배경 클릭 시 닫기
========================= */

/* 모달 요소 찾기 */
const modal = document.getElementById("commonModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const overlay = modal.querySelector('[data-role="overlay"]');
const cancelButton = modal.querySelector('[data-role="cancel"]');
const confirmButton = modal.querySelector('[data-role="confirm"]');
const openButtons = document.querySelectorAll(".open-modal-btn");

/* 
  현재 모달 상태 저장용 변수
  - type: confirm(투버튼), alert(원버튼)
  - confirmUrl: 확인 클릭 시 이동할 주소
*/
let modalState = {
    type: "confirm",
    confirmUrl: ""
};

/* =========================
   모달 열기 함수
========================= */
function openModal({ type = "confirm", title = "", text = "", confirmUrl = "" }) {
    /* 현재 상태 저장 */
    modalState.type = type;
    modalState.confirmUrl = confirmUrl;

    /* 모달 내용 변경 */
    modalTitle.textContent = title;
    modalDescription.textContent = text;

    /* 
      모달 타입에 따라 클래스 변경
      - alert: 원버튼 모달
      - confirm: 투버튼 모달
    */
    if (type === "alert") {
        modal.classList.add("single");
    } else {
        modal.classList.remove("single");
    }

    /* 모달 표시 */
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    /* 배경 스크롤 방지 */
    document.body.style.overflow = "hidden";
}

/* =========================
   모달 닫기 함수
========================= */
function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");

    /* 배경 스크롤 복구 */
    document.body.style.overflow = "";

    /* 상태 초기화 */
    modalState = {
        type: "confirm",
        confirmUrl: ""
    };
}

/* =========================
   페이지 이동 함수
   - confirmUrl이 있으면 해당 페이지로 이동
========================= */
function moveToPage(url) {
    if (!url) return;

    window.location.href = url;
}

/* =========================
   모달 실행 버튼 이벤트 등록
   - data 속성 값을 읽어서 공통 모달에 주입
========================= */
openButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const type = button.dataset.modalType;
        const title = button.dataset.modalTitle;
        const text = button.dataset.modalText;
        const confirmUrl = button.dataset.confirmUrl;

        openModal({
            type,
            title,
            text,
            confirmUrl
        });
    });
});

/* =========================
   취소 버튼 클릭
   - 투버튼 모달에서만 사용
   - 원래 페이지 상태로 돌아가도록 단순 닫기 처리
========================= */
cancelButton.addEventListener("click", () => {
    closeModal();
});

/* =========================
   확인 버튼 클릭
   - 원버튼/투버튼 공통
   - 특정 페이지 이동 가능
========================= */
confirmButton.addEventListener("click", () => {
    moveToPage(modalState.confirmUrl);
});

/* =========================
   배경 클릭 시 닫기
   - 투버튼 모달(confirm)에서만 닫힘
   - 원버튼 모달(alert)에서는 닫히지 않음
========================= */
overlay.addEventListener("click", () => {
    if (modalState.type === "confirm") {
        closeModal();
    }
});

/* =========================
   ESC 키로 닫기
   - 투버튼 모달(confirm)일 때만 닫히도록 처리
========================= */
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
        if (modalState.type === "confirm") {
            closeModal();
        }
    }
});