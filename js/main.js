new Vue({
    el:'#app',
    data:{
        valuta:{},
        bedrag: null,
        van: 'EUR',
        naar: 'USD',
        resultaat: null
    },
    mounted(){
      this.getValuta();

    },
    computed:{
      formatValuta(){
          return Object.values(this.valuta);
      },
        berekenResultaat(){
          return (Number(this.bedrag) * this.resultaat).toFixed(3);
        }
    },
    methods:{
        getValuta(){
            const valuta = localStorage.getItem('valuta');
            if(valuta){
                this.valuta = JSON.parse(valuta);
                return;
            }
            axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
                .then(response => {
                    this.valuta = response.data.results
                    localStorage.setItem('valuta', JSON.stringify(response.data.results))
                });
        },
        convertValuta(){
            const mijnConversie = this.van + '_' + this.naar
            axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=' + mijnConversie)
                .then(response => {
                        this.resultaat = response.data.results[mijnConversie].val
                    }



                )
        }
    }
})