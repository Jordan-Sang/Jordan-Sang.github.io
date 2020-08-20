const catalog = [{
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J.K. Rowling',
    altAuthorSpelling: 'JK Rowling',
    coverSrc: 'https://m.media-amazon.com/images/I/41czrf+j4GL._AC_UL320_.jpg',
    id: 1
}, {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-hunger-games/9780439023528_custom-49e9c33a338d97f0abb78402bcdee9b1103f33a0-s300-c85.jpg',
    id: 2
}, {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/to-kill-a-mockingbird/9780060935467_custom-b86b41b7267a0af1f40c1fed963206e49c03ad56-s300-c85.jpg',
    id: 3
}, {
    title: 'The Fault in Our Stars',
    author: 'John Green',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-fault-in-our-stars/9780525478812_custom-7eb6cc16a8a3f2266865895e1718ac9e9d6232e0-s300-c85.jpg',
    id: 4
}, {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    altAuthorSpelling: 'JRR Tolkien',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/h/hobbit-or-there-and-back-again/9780345339683_custom-70a1718cd320dd9557789bbb7a1a004349156b48-s300-c85.jpg',
    id: 5
}, {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    altAuthorSpelling: 'JD Salinger',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/c/catcher-in-the-rye/9780316769488_custom-b6fc2e108f3865eb320720875c20e4f869da8065-s300-c85.jpg',
    id: 6
}, {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    altAuthorSpelling: 'JRR Tolkien',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-lord-of-the-rings/9780618640157_custom-bd5c36cb700fafac72208e5f622a6d1a9ca85489-s300-c85.jpg',
    id: 7
}, {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/f/fahrenheit-451/9781451673319_custom-90768645bbf0156499f341fdaa4acd3e3e3cecc1-s300-c85.jpg',
    id: 8
}, {
    title: 'Looking for Alaska',
    author: 'John Green',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/l/looking-for-alaska/9780142402511_custom-66e143a11d17d4c35815b4986c68fb2d63f4547b-s300-c85.jpg',
    id: 9
}, {
    title: 'The Book Thief',
    author: 'Markus Zusak',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-book-thief/9780375842207_custom-3be6aba13d9125e812ee424256983b69698244dc-s300-c85.jpg',
    id: 10
}, {
    title: 'The Giver',
    author: 'Lois Lowry',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-giver/9780786271542_vert-d7cd15748bb249322ee9000940261838d9b3e004-s200-c85.jpg',
    id: 11
}, {
    title: `The Ultimate Hitchhiker's Guide To The Galaxy`,
    author: 'Douglas Adams',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-ultimate-hitchhikers-guide-to-the-galaxy/9780345453747_custom-829c890084eb722b8042af3994aa9a27bf12044f-s300-c85.jpg',
    id: 12
}, {
    title: 'The Outsiders',
    author: 'S.E. Hinton',
    altAuthorSpelling: 'SE Hinton',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-outsiders/9780142407332_custom-bbbc04051d3f6988b05380c266ddc4c709879a48-s300-c85.jpg',
    id: 13
}, {
    title: 'Anne of Green Gables',
    author: 'L.M. Montgomery',
    altAuthorSpelling: 'LM Montgomery',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/c/complete-anne-of-green-gables/9780553609417_custom-ca4455d0c15d99fc51ea2900942fec2d9c13388c-s300-c85.jpg',
    id: 14
}, {
    title: 'The Princess Bride',
    author: 'William Goldman',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/t/the-princess-bride/9780156035217_custom-69cc59005e0af076765c029f6ec69ba6f123abaa-s300-c85.jpg',
    id: 15
}, {
    title: 'Lord of the Flies',
    author: 'William Golding',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/l/lord-of-the-flies/9780399501487_custom-16f49e664528eec135f04948cd7384b93c063a08-s300-c85.jpg',
    id: 16
}, {
    title: 'Divergent',
    author: 'Veronica Roth',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/d/divergent/9780062024039_custom-6b2ed0b3ebbd559fe8a0527ec3f7d4ca7aecf427-s300-c85.jpg',
    id: 17
}, {
    title: 'Paper Towns',
    author: 'John Green',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/p/paper-towns/9780142414934_custom-78046b0de5b994057a219347ac9bde06b3fa3664-s300-c85.jpg',
    id: 18
}, {
    title: 'Flowers For Algernon',
    author: 'Daniel Keyes',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/f/flowers-for-algernon/9780156030304_custom-6e548494c903bcb00c0e7def3d16bf506fe44cbe-s300-c85.jpg',
    id: 19
}, {
    title: 'Uglies',
    author: 'Scott Westerfeld',
    altAuthorSpelling: '',
    coverSrc: 'https://media.npr.org/assets/bakertaylor/covers/u/uglies/9781442419810_custom-e61c279d3708a80cf5b2b1656c8055a49ea87daa-s300-c85.jpg',
    id: 20
}];

module.exports = catalog;