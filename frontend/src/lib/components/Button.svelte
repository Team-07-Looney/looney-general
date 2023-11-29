<script>
	export let menuOpen;
</script>

<style>	
/* Dropdown Button */
.dropbtn {
  background-color: gray;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
</style>

  <button on:click class="dropbtn">{!menuOpen ? "..." : "Close"}</button>
