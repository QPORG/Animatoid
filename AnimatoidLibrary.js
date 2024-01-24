const globalTweens = []

class Sequencer {
  constructor(mesh) {
    this.o = {
      returnToState: true
    };
    this.m = mesh;
    this.kf = []
    this.globalKeyFrameIndex = 0;
  }

  runAnimation(adc=()=>{}) {
    const originalState = JSON.parse(this.kf[0][4])
    const kfl = this.kf.length
    const rts = this.o.returnToState
    if (this.globalKeyFrameIndex >= kfl) { 
      this.globalKeyFrameIndex = 0

      if (rts == true) {
        this.kf.at(-1)[0].onComplete(() => {
          this.m.position.x = originalState.position.x
          this.m.position.y = originalState.position.y
          this.m.position.z = originalState.position.z
        })
    
      
    }
      
      adc()
      return
  }
  
    setTimeout(() => {
      this.callTweenByIndex(this.globalKeyFrameIndex)
      setTimeout(() => {
        this.globalKeyFrameIndex++
        this.runAnimation(adc)
      },this.kf[this.globalKeyFrameIndex][2])
    },this.kf[this.globalKeyFrameIndex][3])
  }
  setReturnToState(b) {
    this.o.returnToState = b;
  }

  createKeyFrame(state, milliseconds, to, easingCategory, easing, startPosition=0) {
    const ostate =JSON.stringify(state)
     const tween = new TWEEN.Tween(state, false)
     globalTweens.push(tween)
		tween.to(to, milliseconds) // Move to (300, 200) in 1 second.
		.easing(TWEEN.Easing[easingCategory][easing]) // Use an easing function to make the animation smooth.
		.onUpdate((stateUpdate) => {
			if (stateUpdate.position) {
        this.m.position.x = stateUpdate.position.x
        this.m.position.y = stateUpdate.position.y
        this.m.position.z = stateUpdate.position.z
      }
		})

    this.kf.push([tween, to, milliseconds, startPosition, ostate])
  }

  callTweenByIndex(i) {
    this.kf[i][0].start()
  }

  getChild(n) {
    return new Sequencer(this.m.children[n]);
  }
}

const Animatoid = {
  Sequencer: Sequencer
}
