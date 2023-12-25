<script>
 export let title;
 export let date;
 export let iconType;
 let icon;

 if(iconType === "Negative") {
    icon = "sad";
 }
</script>
<div class="bg-white rounded-xl py-2 px-3 flex flex-row w-full justify-between items-center" style="box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px">
    <div>
        <img src={`../../src/img/sad.png`} alt="emotion" class=" h-14">
    </div>
    <div class="flex flex-col">
        <p class=" text-xl font-bold">{title}</p>
        <p>{date}</p>
    </div>
    <div class="pl-16">
        <img src="../../src/img/trashIcon.png" alt="trash" class="h-8">
    </div>
</div>