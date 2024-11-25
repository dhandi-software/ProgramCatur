function insertImage() {
    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='all-img all-pawn' src="/images/${image.innerText}.png" alt="">`;
                image.style.cursor = 'pointer';
            } else {
                image.innerHTML = `${image.innerText} <img class='all-img' src="/images/${image.innerText}.png" alt="">`;
                image.style.cursor = 'pointer';
            }
        }
    });
}
insertImage();


//Coloring the board

function coloring() {
    const color = document.querySelectorAll('.box')

    color.forEach(color => {
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(232 235 239)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(125 135 150)'
        }
    })
}
coloring()


//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'blue') {

            document.querySelectorAll('.box').forEach(i2 => {

                if (i2.style.backgroundColor == 'greenyellow' && i2.innerText.length !== 0) {


                    greenyellowText = i2.innerText

                    blueText = i1.innerText

                    blueColor = ((Array.from(blueText)).shift()).toString()
                    greenyellowColor = ((Array.from(greenyellowText)).shift()).toString()

                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup

                    if (a % 2 == 0 && blueColor == greenyellowColor) {
                        i2.style.backgroundColor = 'rgb(232 235 239)'
                    }
                    if (a % 2 !== 0 && blueColor == greenyellowColor) {
                        i2.style.backgroundColor = 'rgb(125 135 150)'
                    }

                }
            })
        }
    })
}

//reset button
document.getElementById("reset-btn").addEventListener("click", function () {
    location.reload();
});

const player1 = window.playerData.player1;
const player2 = window.playerData.player2;

document.getElementById('tog').innerText = `Player 1 Nama: ${player1.name}`;



let tog = 1

console.log(player1)

document.querySelectorAll('.box').forEach(item => {


    item.addEventListener('click', function () {

             // Tentukan giliran pemain dan warna pion yang dapat digerakkan
        const isWhiteTurn = tog % 2 !== 0;
        const pieceColor = item.innerText.startsWith("W")
        ? "player1"
        : item.innerText.startsWith("B")
        ? "player2"
        : "";

        // Logika untuk memindahkan pion atau memakan pion lawan
        if (item.style.backgroundColor === 'greenyellow') {
            // Jika kotak berwarna hijau muda dan kosong (bergerak tanpa makan)
            if (item.innerText.length === 0) {
                tog++;
            } 
            // Jika kotak berwarna hijau muda dan berisi pion lawan, maka pion tersebut dimakan
            else if (item.innerText.startsWith(isWhiteTurn ? 'B' : 'W')) {
                document.querySelectorAll('.box').forEach(i => {
                    if (i.style.backgroundColor === 'blue') {
                        let blueId = i.id;
                        let blueText = i.innerText;

                        // Pindahkan pion ke kotak yang berisi pion lawan
                        document.getElementById(blueId).innerText = ''; // Hapus pion dari kotak asal
                        item.innerText = blueText; // Gantikan pion lawan dengan pion pemain saat ini
                        coloring(); // Perbarui tampilan papan
                        insertImage(); // Tambahkan gambar pion yang baru
                        tog++; // Ganti giliran setelah memakan pion lawan
                    }
                });
            } else {
                // Jika kotak hijau muda berisi pion sendiri, tidak boleh makan
                alert("Gerakan tidak valid! Anda tidak dapat memakan pion sendiri.");
            }
        } else if (pieceColor && ((isWhiteTurn && pieceColor === 'black') || (!isWhiteTurn && pieceColor === 'white'))) {
            // Menampilkan pesan jika pengguna mencoba memilih pion lawan di luar area valid
            alert("Gerakan tidak valid! Anda tidak dapat menggerakkan pion lawan.");
        }

        // Dapatkan ID dan posisi kotak untuk penentuan langkah selanjutnya
        let getId = item.id;
        let arr = Array.from(getId);
        arr.shift();
        let aside = eval(arr.pop());
        arr.push('0');
        let aup = eval(arr.join(''));
        let a = aside + aup;



        //function to display the available paths for all pieces

        function whosTurn(toggle) {
            // PAWN

            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'blue';

                if (tog % 2 !== 0 && aup < 800) {
                    // First move for white pawns
                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow';
                        if (document.getElementById(`b${a + 200}`).innerText.length == 0 && aup < 300) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'greenyellow';
                        }
                    }
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow';
                    }
                }

                if (tog % 2 == 0 && aup > 100) {
                    // First move for black pawns
                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow';
                        if (document.getElementById(`b${a - 200}`).innerText.length == 0 && aup > 600) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'greenyellow';
                        }
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow';
                    }
                }
                // Second move for pawns
                if (tog % 2 !== 0 && aup >= 800) {
                    if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow';
                    }
                }
                if (tog % 2 == 0 && aup <= 100) {
                    if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow';
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow';
                    }
                }
            }

            // KING

            if (item.innerText == `${toggle}king`) {


                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'greenyellow'

                }
                if (aside > 1) {

                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aup < 800) {

                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'greenyellow'
                }
                if (aup > 100) {

                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'greenyellow'
                }

                if (aup > 100 && aside < 8) {

                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aup > 100 && aside > 1) {

                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aup < 800 && aside < 8) {

                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aup < 800 && aside > 1) {

                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'greenyellow'
                }

                item.style.backgroundColor = 'blue'

            }

            // KNIGHT

            if (item.innerText == `${toggle}knight`) {


                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'greenyellow'
                }
                if (aside < 7 && aup > 200) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'greenyellow'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'greenyellow'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'greenyellow'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'greenyellow'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'greenyellow'
                }

                item.style.backgroundColor = 'blue'

            }

            // QUEEN

            if (item.innerText == `${toggle}queen`) {


                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }



                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }



                item.style.backgroundColor = 'blue'

            }

            // BISHOP

            if (item.innerText == `${toggle}bishop`) {


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }


                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }

                }


                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }



                item.style.backgroundColor = 'blue'

            }

            // ROOK

            if (item.innerText == `${toggle}rook`) {

                for (let i = 1; i < 9; i++) {

                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                for (let i = 1; i < 9; i++) {

                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'greenyellow'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'greenyellow'
                        break
                    }
                }

                item.style.backgroundColor = 'blue'
            }

        }

        if (tog % 2 !== 0) {
            document.getElementById('current-player-name').innerText = player1.name;
            document.getElementById('tog').innerText = `Player 1 Nama: ${player1.name}`;
            whosTurn('W');
        }
        if (tog % 2 === 0) {
            document.getElementById('current-player-name').innerText = player2.name;
            document.getElementById('tog').innerText = `Player 2 Nama: ${player2.name}`;
            whosTurn('B');
        }
        

        reddish()



    })
})

// Moving the element
document.querySelectorAll('.box').forEach(hathiTest => {

    hathiTest.addEventListener('click', function () {

        if (hathiTest.style.backgroundColor == 'blue') {

            blueId = hathiTest.id
            blueText = hathiTest.innerText

            document.querySelectorAll('.box').forEach(hathiTest2 => {

                hathiTest2.addEventListener('click', function () {
                    if (hathiTest2.style.backgroundColor == 'greenyellow' && hathiTest2.innerText.length == 0) {
                        document.getElementById(blueId).innerText = ''
                        hathiTest2.innerText = blueText
                        coloring()
                        insertImage()

                    }

                })
            })

        }

    })

})




// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
  ee.addEventListener('click', function () {
      z = z + 1
      if (z % 2 == 0 && ee.style.backgroundColor !== 'greenyellow') {
          coloring()
      }
  })
})