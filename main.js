$(document).ready(function() {
    var k = 0;
    var s = 0;
    $('.text-enc').click(function() {
        $('.error').empty();
        var st = $('.text').val();
        var b = [];
        for (var i = 0; i < st.length; i += 2) b.push(new byte(parseInt(st.substr(i, 2), 16)));
        var s = new state({b: b});

        st = $('.key').val();
        b = [];
        for (var i = 0; i < st.length; i += 2) b.push(new byte(parseInt(st.substr(i, 2), 16)));
        var k = new key(b);

        if (s.e == 1) $('.error').append("Wrong text<br>");
        if (k.e == 1) $('.error').append("Wrong key");
        if (s.e == 0 && k.e == 0) {
            console.log(k.getHex());
            console.log(s.getHex());
            var rk = k.keyExpansionT();
            var cs = s.CipherT(rk);
            console.log(cs.getHex());
            $('.cipher').val(cs.getHex());
        }
    });
    $('.cip-dec').click(function() {
        $('.error').empty();
        var st = $('.cipher').val();
        var b = [];
        for (var i = 0; i < st.length; i += 2) b.push(new byte(parseInt(st.substr(i, 2), 16)));
        var s = new state({b: b});

        st = $('.key').val();
        b = [];
        for (var i = 0; i < st.length; i += 2) b.push(new byte(parseInt(st.substr(i, 2), 16)));
        var k = new key(b);

        if (s.e == 1) $('.error').append("Wrong cipher<br>");
        if (k.e == 1) $('.error').append("Wrong key");
        if (s.e == 0 && k.e == 0) {
            var rk = k.keyExpansionT();
            var cs1 = s.InvCipherT(rk);
            $('.inv_cipher').val(cs1.getHex());
            var cs2 = s.EqInvCipherT(rk);
            $('.eq_inv_cipher').val(cs2.getHex());
        }
    });
});
