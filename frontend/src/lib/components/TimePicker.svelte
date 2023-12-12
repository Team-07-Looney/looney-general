<!-- credits: https://github.com/projectbadger/svelte-touch-timepicker -->
<script>
    import { createEventDispatcher } from 'svelte';
    import Switcher from './Switcher.svelte';
  
    export let visible = false;
    export let classes = 'appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none';
    export let display24 = false;
    export let locale = 'en-GB';
    export let label;
    export let placeholder;
    export let id;
    export let data;
    const dataElements = data?data.split(':'):[0, 0];
    let currentDate = new Date();
    export let date = data && display24 ? new Date(`01/01/1970 ${data}`) : data && !display24 && dataElements[0] < 60 ? new Date(`01/01/1970 ${currentDate.getHours()}:${data}`) : data && !display24 && dataElements[0] >= 60 ? new Date(`01/01/1970 ${currentDate.getHours() + Math.floor(dataElements[0] / 60)}:${dataElements[0] - Math.floor(dataElements[0] / 60) * 60}:${dataElements[1]}`) : new Date();
    let timeStyle = display24?"short":"medium";
    let currentMinutes = data && dataElements[0] >= 60 ? (date.getHours() - currentDate.getHours()) * 60 + date.getMinutes() : data ? date.getMinutes() : 0;
    let currentSeconds = data?date.getSeconds():0;
    let dateChange = false;
    let minutesChange = false;
    let secondsChange = false;
  
    const HOURS = new Array(24).fill(0).map((v, i) => v + i);
    const MINUTES = new Array(display24?60:90).fill(0).map((v, i) => v + i);
    const SECONDS = new Array(60).fill(0).map((v, i) => v + i);
    const dispatch = createEventDispatcher();
  
    let _date, popup;
    $:  _date = date.toLocaleTimeString(locale, { timeStyle: timeStyle });
  
    let resetDate = () => {
      if (display24) date = new Date();
      else {
        currentMinutes = 0;
        currentSeconds = 0;
        date = new Date(`01/01/1970 ${currentDate.getHours()}:00:00`);
        dateChange = false;
        minutesChange = false;
        secondsChange = false;
      }
    }
  
    let dateChanged = (event) => {
      let {type, changedData} = event.detail;
      let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      switch(type) {
        case 'hour':
          newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), changedData, date.getMinutes(), date.getSeconds());
          break;
        case 'minute':
          if (changedData >= 60) {
            const hours = Math.floor(changedData / 60);
            newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), currentDate.getHours() + hours, changedData - hours * 60, date.getSeconds());
          } else {
            newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), display24?date.getHours():currentDate.getHours(), changedData, date.getSeconds());
          }
          currentMinutes = changedData;
          minutesChange = true;
          break;
        case 'second':
          currentSeconds = changedData;
          newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), changedData);
          secondsChange = true;
          break;
      }
  
      date = newDate;
      dispatch('dateChange', {date});
      dateChange = true;
    }
  
    function confirmDate(event){
      visible = !visible
      dateChange = true;
      dispatch('confirmDate', {MouseEvent:event, date});
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
  
  <div class="text-{color}">
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
        <input 
        type="text" 
        id={id} 
        name={id} 
        class='{classes}' 
        readonly 
        value={dateChange && display24 ? _date : dateChange && !display24 ? `${currentMinutes}:${currentSeconds}` : data ? data : ''}
        placeholder="{placeholder}" 
        on:focus={() => {visible = !visible}}>
  </div>
</div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if visible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="touch-date-popup" on:click={clickedOutside} bind:this={popup}>
      <div>
        <div class="touch-date-wrapper">
          <div class="flex flex-row items-center gap-6 {display24?"pl-3":""} mx-10">
            <p>{display24?"Hours":"Minutes"}</p>
            <p>{display24?"Minutes":"Seconds"}</p>
          </div>
          <div class='touch-date-picker'>
            {#if display24}
              <Switcher type='hour' data={HOURS} selected={date.getHours()+1} on:dateChange={dateChanged}/>
              <Switcher type='minute' data={MINUTES} selected={date.getMinutes()+1} on:dateChange={dateChanged}/>
            {:else}
              <Switcher type='minute' data={MINUTES} selected={data || minutesChange?(date.getHours() - currentDate.getHours()) * 60 + date.getMinutes() + 1:1} on:dateChange={dateChanged}/>
              <Switcher type='second' data={SECONDS} selected={data || secondsChange?date.getSeconds() + 1:1} on:dateChange={dateChanged}/>
            {/if}
            
          </div>
          <div class='touch-date-reset'>
            <button on:click|stopPropagation|preventDefault={resetDate}>Reset</button>
            <button on:click|stopPropagation={confirmDate}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  {/if}