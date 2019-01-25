jQuery(document).ready(function($) {
  "use strict";

  //CEP
  $("input.cep").mask("99999-999", {completed:function(){
    var cep = $(this).val().replace(/[^0-9]/,"");
    if (cep.length != 8) {
      return false;
    }

    var url = "https://viacep.com.br/ws/"+cep+"/json/";
    $.getJSON(url, function(dadosRetorno){
      try{
        $("input.endereco").val(dadosRetorno.logradouro);
        $("input.bairro").val(dadosRetorno.bairro);
        $("input.cidade").val(dadosRetorno.localidade);
        $("input.uf").val(dadosRetorno.uf);

        var bairros = ['Tijuca', 'Grajaú', 'Maracanã', 'São Cristóvão', 'Usina', 'Vila Isabel', 'Cachambi', 'Méier',
          'Del Castilho', 'Engenho de Dentro', 'São Francisco Xavier', 'Engenho Novo', 'Riachuelo', 'Rocha', 'Sampaio',
          'Madureira', 'Oswaldo Cruz', 'Copacabana', 'Turiaçu', 'Rocha Miranda', 'Cidade Universitária', 'Taquara',
          'Freguesia', 'Realengo', 'Barra da Tijuca', 'Alto da Boa Vista', 'Ramos'];
        if ((bairros.indexOf($('input.bairro').val()) > -1) && (dadosRetorno.localidade == 'Rio de Janeiro')) {
          $("input.atendido").val('S');
          $('#bairro_retorno').html('<b>' + $("input.bairro").val() + '</b>');
        } else {
          $("input.atendido").val('N');
        }
        $("input.numero").focus();
      }catch (e) {}
    });
  }});

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();




    if ($(this).attr("id") == "gform") {
      //$.get("http://www.google.com/?", str);
      $('#title_modal').html($("#planoTitle").html());
      if ($("input.atendido").val() == 'S') {
        $('#bairro_retorno').html('<b>' + $("input.bairro").val() + '</b>');
        if ($('input.plano').val() == 'Avulso') {
          $('#code_pagseguro').val("195F59FE8D8D58FDD4D09FA77BEC71ED");
        } else if ($('input.plano').val() == 'Solteiro') {
          $('#code_pagseguro').val("D42486F5F0F089C66405CF9B3AC12CD9");
        } else if ($('input.plano').val() == 'Casal') {
          $('#code_pagseguro').val("87882C7BA9A9673774761FA087E49E19");
        }
        $('#retorno_compra').show();
      } else {
        $('#retorno_espera').show();
      }
      $.get("https://docs.google.com/forms/d/e/1FAIpQLSfsFgJ7YgDlzQG9C10yV1yVpiQXrO7SlOQJqa8ANB1n1yGSJg/formResponse?", str);
      $('#gform *').fadeOut(100);
      //$('.contactForm').find("input, textarea").val("");
    }





    /*$.ajax({
      type: "POST",
      url: "contactform/contactform.php",
      data: str,
      success: function(msg) {
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });*/
    return false;
  });

});
