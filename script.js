// 오디오 요소 및 상태 정의
const audioPlayer = document.getElementById('music-player');
const lyricImage = document.getElementById('lyric-image');
const screenViewport = document.getElementById('screen-viewport');

// 💡 TV 프레임 오버레이 요소를 가져옵니다.
const frameOverlay = document.getElementById('frame-overlay');

// 🎧 곡 목록 (실제 파일 경로로 반드시 변경하세요!)
const songs = [
    { 
        id: 1,
        src: 'audio/runlikethis.mp3',      // 🎧 첫 번째 곡 오디오 파일 경로 수정
        lyricImg: 'web_lyrics_runlikethis.png', // 🖼️ 첫 번째 곡 가사 이미지 파일 경로 수정
        frameImg: 'web_tv_runlikethis.png' // 👈 곡 1의 TV 프레임 이미지 경로
    },
    { 
        id: 2,
        src: 'audio/bluemoon.mp3',     // 🎧 두 번째 곡 오디오 파일 경로 수정
        lyricImg: 'web_lyrics_bluemoon.png', // 🖼️ 두 번째 곡 가사 이미지 파일 경로 수정
        frameImg: 'web_tv_bluemoon.png' // 👈 곡 2의 TV 프레임 이미지 경로
    },
    { 
        id: 3,
        src: 'audio/moonshot.mp3',      // 🎧 세 번째 곡 오디오 파일 경로 수정
        lyricImg: 'web_lyrics_moonshot.png', // 🖼️ 세 번째 곡 가사 이미지 파일 경로 수정
        frameImg: 'web_tv_moonshot.png' // 👈 곡 3의 TV 프레임 이미지 경로
    },
    { 
        id: 4,
        src: 'audio/1.mp3',      // 🎧 네 번째 곡 오디오 파일 경로 수정
        lyricImg: 'web_lyrics_1.png', // 🖼️ 네 번째 곡 가사 이미지 파일 경로 수정
        frameImg: 'web_tv_1.png' // 👈 곡 4의 TV 프레임 이미지 경로
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// 🔊 음악 재생 기능
function playMusic() {
    if (!isPlaying) {
        audioPlayer.play();
        isPlaying = true;
        console.log("음악 재생됨");
    }
}

// ⏸️ 음악 멈춤 기능
function pauseMusic() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        console.log("음악 멈춤");
    }
}

// ⏭️ 곡 이동 기능
function changeSong(songId) {
    const newIndex = songId - 1; // 곡 번호(1~4)를 인덱스(0~3)로 변환

    if (newIndex >= 0 && newIndex < songs.length) {
        currentSongIndex = newIndex;
        const newSong = songs[currentSongIndex];
        
        // ... (오디오, 가사, TV 프레임 변경 코드 유지) ...
        audioPlayer.src = newSong.src;
        lyricImage.src = newSong.lyricImg;
        frameOverlay.style.backgroundImage = `url('${newSong.frameImg}')`;
        screenViewport.scrollTop = 0; 
        
        // 💡 핵심: 현재 재생 중인 곡을 기준으로 버튼을 다시 할당
        //updateChannelButtons(currentSongIndex); 

        // ... (음악 재생 로직 유지) ...
        audioPlayer.load();
        if (isPlaying) {
            audioPlayer.play();
        }
        
        console.log(`곡 ${songId}로 이동 완료.`);
    } else {
        console.error("잘못된 곡 번호입니다.");
    }
}

// 오디오가 끝나면 isPlaying 상태를 리셋
audioPlayer.onended = function() {
    isPlaying = false;
    console.log("음악 재생 종료.");
};



// ❌❌❌ 제거해야 할 부분 2: 이 함수 전체를 삭제합니다. ❌❌❌
/* function updateChannelButtons(currentIndex) {
    const channelButtons = document.querySelectorAll('.channel-btn'); // 모든 채널 버튼 가져오기
    
    // 현재 곡을 제외한 나머지 곡들의 'id'를 담을 배열
    const availableSongIds = [];
    
    // 전체 곡(id: 1, 2, 3, 4)에서 현재 곡(currentIndex + 1)을 제외하고 배열에 추가
    for (let i = 1; i <= songs.length; i++) {
        if (i !== (currentIndex + 1)) {
            availableSongIds.push(i);
        }
    }
    
    // 오른쪽 3개 버튼에 순서대로 availableSongIds의 곡 번호 연결
    channelButtons.forEach((button, index) => {
        const targetSongId = availableSongIds[index];
        
        // 1. 버튼의 onclick 속성 변경
        button.setAttribute('onclick', `changeSong(${targetSongId})`);
        
        // 2. (선택 사항) 버튼의 시각적인 표시 (예: 버튼 텍스트를 곡 번호로 변경)
        button.textContent = `CH ${targetSongId}`;
        
        // 3. 버튼의 id에 현재 연결된 곡 번호를 저장 (CSS 스타일링 등에 사용 가능)
        button.id = `song-${targetSongId}`;
    });

    console.log(`현재 곡 ${currentIndex + 1}을 제외한 버튼 할당:`, availableSongIds);
}
*/

// 💡 페이지 로드 시 초기화 함수
document.addEventListener('DOMContentLoaded', (event) => {
    // URL에서 쿼리 파라미터(예: ?song=2)를 분석합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const initialSongId = urlParams.get('song');
    
    let startSongId = 1; // 기본값은 1번 곡
    
    if (initialSongId) {
        startSongId = parseInt(initialSongId);
        currentSongIndex = startSongId - 1;
        
        // URL 파라미터가 있어도 changeSong만 호출하고, 재생은 하지 않습니다.
        changeSong(startSongId); 
        
    } else {
        // ❌❌❌ 제거해야 할 부분 3: 버튼 업데이트 호출 제거 ❌❌❌
        // 파라미터가 없으면 1번 곡을 기준으로 버튼만 초기 설정합니다.
        // updateChannelButtons(currentSongIndex); 
        
        // 💡 1번 곡으로 초기화는 필요합니다.
        changeSong(startSongId);
    }
    
    // 💡 초기 상태를 '멈춤'으로 설정합니다.
    isPlaying = false;
});