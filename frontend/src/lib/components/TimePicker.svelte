<!-- credits: https://github.com/projectbadger/svelte-touch-timepicker -->
<script>
    import { createEventDispatcher } from 'svelte';
    import Switcher from './Switcher.svelte';
  
    export let date = new Date();
    export let visible = false;
    export let classes = 'appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none';
    export let display24 = true;
    export let locale = 'en-GB';
    export let label;
    export let placeholder;
    let dateChange = false;
  
    const HOURS = new Array(display24?24:12).fill(0).map((v, i) => v + i);
    const MINUTES = new Array(60).fill(0).map((v, i) => v + i);
    const dispatch = createEventDispatcher();
  
    let _date, popup;
    $:  _date = date.toLocaleTimeString(locale, { timeStyle: 'short' });
  
    let resetDate = () => {
      date = new Date();
    }
  
    let dateChanged = (event) => {
      let {type, changedData} = event.detail;
      let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      switch(type) {
        case 'hour':
          if(!display24 && date.getHours() >= 12) {
            changedData += 12
          }
          newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), changedData, date.getMinutes(), date.getSeconds());
          break;
        case 'minute':
          newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), changedData, date.getSeconds());
          break;
      }
  
      date = newDate;
      dispatch('dateChange', {date});
      dateChange = true;
    }
  
    function confirmDate(event){
      visible = !visible
      dispatch('confirmDate', {MouseEvent:event, date});
      dateChange = true;
    }
  
    function clickedOutside(event){
      if(event.target == popup){
        visible = false
      }
    }

    export let error = false;

    let color = error ? 'red-700' : 'black';
  </script>
  
  <style>
  .touch-date-popup{
    z-index: 1;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0, 0, 0, 0.3);
    touch-action: pan-down;
  }
  .touch-date-popup > div{
    background: var(--svtd-popup-bg-color, white);
    color: var(--svtd-popup-color, black);
    margin-top: 30vh;
    width: 85%;
    margin-left: 7%;
    border-radius: var(--svtd-popup-radius, 10px);
  }
  .touch-date-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: var(--svtd-font-size, 20px);
    padding: 1.5rem;
  }
  
  .touch-date-picker {
    display: flex;
    padding: 50px 20px;
    margin: 10px 0;
    overflow: hidden;
  }
  
  .touch-date-reset > button {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: var(--svtd-border, 1px solid grey);
    outline: none;
    color: var(--svtd-button-color, black);
    background-color: var(--svtd-button-bg-color, transparent);
    box-shadow: var(--svtd-button-box-shadow, none) ;
    font-weight: 300;
  }
  .touch-date-reset button:active {
    -webkit-transform: scale(0.95);
            transform: scale(0.95);
  }
  
  .date-line {
    font-size: 30px;
    font-weight: 300;
  }
  .day-line{
    margin: 2px;
  }
  </style>
  
<label for="start_time" class="text-base">{label}</label>
<div class="flex items-center border-b border-{color} pb-2">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
    >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
    <input type="text" class='{classes}' readonly value="{dateChange ? _date : placeholder}" placeholder="{placeholder}" on:focus={() => {visible = !visible}}>
</div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if visible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="touch-date-popup" on:click={clickedOutside} bind:this={popup}>
      <div>
        <div class="touch-date-wrapper">
          <div class='touch-date-picker'>
            <Switcher type='hour' data={HOURS} selected={display24?date.getHours()+1:date.getHours()%12+1} on:dateChange={dateChanged}/>
            <Switcher type='minute' data={MINUTES} selected={date.getMinutes()+1} on:dateChange={dateChanged}/>
          </div>
          <div class='touch-date-reset'>
            <button on:click|stopPropagation={resetDate}>Reset</button>
            <button on:click|stopPropagation={confirmDate}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  {/if}